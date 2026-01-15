"""
API Integration Tests
Tests for all API endpoints using FastAPI TestClient.
"""

import pytest
from fastapi import status


class TestHealthEndpoints:
    """Test health check endpoints"""

    def test_health_check(self, test_client):
        """Test basic health check returns 200"""
        response = test_client.get("/health")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

    def test_health_live(self, test_client):
        """Test liveness check"""
        response = test_client.get("/health/live")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["status"] == "alive"

    def test_version_endpoint(self, test_client):
        """Test version endpoint"""
        response = test_client.get("/version")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "version" in data
        assert "service" in data


class TestQuoteEndpoints:
    """Test quote calculation endpoints"""

    def test_calculate_quote_basic(self, test_client, sample_pcb_options):
        """Test basic quote calculation"""
        response = test_client.post("/api/quote/calculate", json=sample_pcb_options)
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["success"] is True
        assert "data" in data
        assert "total" in data["data"]
        assert data["data"]["total"] > 0

    def test_calculate_quote_with_smt(self, test_client, sample_smt_options):
        """Test quote calculation with SMT assembly"""
        response = test_client.post("/api/quote/calculate", json=sample_smt_options)
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["success"] is True
        assert "breakdown" in data["data"]
        # Should have SMT cost since assembly_required is True
        assert data["data"]["breakdown"]["smt"] > 0

    def test_calculate_quote_extreme(self, test_client, extreme_pcb_options):
        """Test quote with extreme options (edge cases)"""
        response = test_client.post("/api/quote/calculate", json=extreme_pcb_options)
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["success"] is True
        # Should have warnings for extreme options
        assert "warnings" in data["data"]
        assert len(data["data"]["warnings"]) > 0

    def test_complete_analysis(self, test_client, sample_pcb_options):
        """Test complete analysis endpoint"""
        response = test_client.post("/api/quote/complete-analysis", json=sample_pcb_options)
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["success"] is True
        assert "dfm_analysis" in data
        assert "score" in data["dfm_analysis"]
        assert "grade" in data["dfm_analysis"]

    def test_calculate_quote_invalid_layers(self, test_client, sample_pcb_options):
        """Test quote with invalid layer count"""
        invalid_options = sample_pcb_options.copy()
        invalid_options["layers"] = 5  # Invalid - must be 1,2,4,6,8,10,12

        response = test_client.post("/api/quote/calculate", json=invalid_options)
        # Should still work but may have warnings
        assert response.status_code in [status.HTTP_200_OK, status.HTTP_422_UNPROCESSABLE_ENTITY]

    def test_calculate_quote_min_values(self, test_client, sample_pcb_options):
        """Test quote with minimum valid values"""
        min_options = sample_pcb_options.copy()
        min_options["quantity"] = 1
        min_options["board_width_mm"] = 5
        min_options["board_height_mm"] = 5

        response = test_client.post("/api/quote/calculate", json=min_options)
        assert response.status_code == status.HTTP_200_OK

    def test_calculate_quote_max_values(self, test_client, sample_pcb_options):
        """Test quote with maximum valid values"""
        max_options = sample_pcb_options.copy()
        max_options["quantity"] = 100000
        max_options["board_width_mm"] = 500
        max_options["board_height_mm"] = 500

        response = test_client.post("/api/quote/calculate", json=max_options)
        assert response.status_code == status.HTTP_200_OK


class TestConfigEndpoints:
    """Test configuration endpoints"""

    def test_get_form_options(self, test_client):
        """Test form options endpoint"""
        response = test_client.get("/api/config/form-options")
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert "finishes" in data
        assert "colors" in data
        assert "layers" in data
        assert "limits" in data

    def test_get_finishes(self, test_client):
        """Test surface finishes endpoint"""
        response = test_client.get("/api/config/finishes")
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Check structure
        assert "value" in data[0]
        assert "label" in data[0]

    def test_get_pricing_factors(self, test_client):
        """Test pricing factors endpoint"""
        response = test_client.get("/api/config/pricing-factors")
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert "finishes" in data
        assert "lead_times" in data


class TestUploadEndpoints:
    """Test file upload endpoints"""

    def test_presigned_url_invalid_extension(self, test_client):
        """Test presigned URL with invalid file extension"""
        response = test_client.post("/api/upload/presigned-url", json={
            "file_name": "malware.exe",
            "content_type": "application/octet-stream"
        })
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_upload_status_not_found(self, test_client):
        """Test upload status for non-existent file"""
        response = test_client.get("/api/upload/status/nonexistent-file-key")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["exists"] is False


class TestRateLimiting:
    """Test rate limiting behavior"""

    def test_rate_limit_headers(self, test_client, sample_pcb_options):
        """Test that rate limit headers are present"""
        response = test_client.post("/api/quote/calculate", json=sample_pcb_options)
        assert response.status_code == status.HTTP_200_OK

        # Check rate limit headers
        assert "x-ratelimit-limit" in response.headers
        assert "x-ratelimit-remaining" in response.headers


class TestErrorHandling:
    """Test error handling"""

    def test_404_for_unknown_endpoint(self, test_client):
        """Test 404 for unknown endpoint"""
        response = test_client.get("/api/unknown/endpoint")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_method_not_allowed(self, test_client):
        """Test 405 for wrong HTTP method"""
        response = test_client.get("/api/quote/calculate")  # Should be POST
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    def test_invalid_json(self, test_client):
        """Test handling of invalid JSON"""
        response = test_client.post(
            "/api/quote/calculate",
            content="not valid json",
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
