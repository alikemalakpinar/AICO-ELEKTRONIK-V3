import React from 'react';
import { Award, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

const DFMPanel = ({ dfmResult, lang = 'tr' }) => {
  if (!dfmResult) return null;

  const content = {
    tr: {
      title: 'DFM Analizi (Design for Manufacturing)',
      score: 'DFM Skoru',
      grade: 'Not',
      manufacturability: 'Üretilebilirlik',
      errors: 'Hatalar',
      warnings: 'Uyarılar',
      passed: 'Geçti',
      failed: 'Başarısız',
      noIssues: 'Sorun bulunamadı',
      checksPassed: 'kontrol geçti',
      totalChecks: 'toplam kontrol'
    },
    en: {
      title: 'DFM Analysis (Design for Manufacturing)',
      score: 'DFM Score',
      grade: 'Grade',
      manufacturability: 'Manufacturability',
      errors: 'Errors',
      warnings: 'Warnings',
      passed: 'Passed',
      failed: 'Failed',
      noIssues: 'No issues found',
      checksPassed: 'checks passed',
      totalChecks: 'total checks'
    }
  };

  const t = content[lang] || content.tr;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (grade) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800 border-green-300',
      'A': 'bg-green-100 text-green-700 border-green-300',
      'B+': 'bg-blue-100 text-blue-800 border-blue-300',
      'B': 'bg-blue-100 text-blue-700 border-blue-300',
      'C+': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'C': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'D': 'bg-orange-100 text-orange-800 border-orange-300',
      'F': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[grade] || colors['C'];
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          {t.title}
        </h3>
        <div className={`px-4 py-2 rounded-lg border-2 ${getGradeBadge(dfmResult.grade)}`}>
          <span className="text-2xl font-bold">{dfmResult.grade}</span>
        </div>
      </div>

      {/* Score and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium mb-1">{t.score}</p>
          <p className={`text-4xl font-bold ${getScoreColor(dfmResult.dfm_score)}`}>
            {dfmResult.dfm_score}/100
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium mb-1">{t.passed}</p>
          <p className="text-4xl font-bold text-green-600">
            {dfmResult.passed}/{dfmResult.total_checks}
          </p>
          <p className="text-xs text-green-600 mt-1">
            {dfmResult.passed} {t.checksPassed}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-700 font-medium mb-1">{t.manufacturability}</p>
          <p className="text-sm font-semibold text-gray-900 mt-2">
            {dfmResult.manufacturability}
          </p>
        </div>
      </div>

      {/* Errors */}
      {dfmResult.errors && dfmResult.errors.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            {t.errors} ({dfmResult.errors.length})
          </h4>
          <div className="space-y-2">
            {dfmResult.errors.map((error, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-medium text-red-900">{error.name}</p>
                <p className="text-sm text-red-700 mt-1">{error.details}</p>
                {error.suggestion && (
                  <p className="text-xs text-red-600 mt-2 italic">💡 {error.suggestion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {dfmResult.warnings && dfmResult.warnings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {t.warnings} ({dfmResult.warnings.length})
          </h4>
          <div className="space-y-2">
            {dfmResult.warnings.map((warning, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="font-medium text-yellow-900">{warning.name}</p>
                <p className="text-sm text-yellow-700 mt-1">{warning.details}</p>
                {warning.suggestion && (
                  <p className="text-xs text-yellow-600 mt-2 italic">💡 {warning.suggestion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Issues */}
      {(!dfmResult.errors || dfmResult.errors.length === 0) && 
       (!dfmResult.warnings || dfmResult.warnings.length === 0) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">{t.noIssues}</p>
        </div>
      )}

      {/* Summary */}
      {dfmResult.summary && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-gray-600 mt-0.5" />
            <p className="text-sm text-gray-700">{dfmResult.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DFMPanel;
