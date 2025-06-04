import {
  collections,
  queryDocuments,
  createAuditLog
} from '../services/db.js';

export const getAuditLogs = async (req, res) => {
  try {
    const { startDate, endDate, action, userId } = req.query;
    const queries = [];

    // Validate and add date range filters
    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d)) {
        queries.push({
          field: 'createdAt',
          operator: '>=',
          value: d
        });
      }
    }

    if (endDate) {
      const d = new Date(endDate);
      if (!isNaN(d)) {
        queries.push({
          field: 'createdAt',
          operator: '<=',
          value: d
        });
      }
    }

    if (action) {
      queries.push({
        field: 'action',
        operator: '==',
        value: action
      });
    }

    if (userId) {
      queries.push({
        field: 'userId',
        operator: '==',
        value: userId
      });
    }

    // Query audit logs
    const auditLogs = await queryDocuments(collections.AUDIT_LOGS, queries);

    // Sort by createdAt descending
    auditLogs.sort((a, b) => {
      const getTime = (x) =>
        x.createdAt?.toMillis?.() ||
        x.createdAt?.getTime?.() ||
        new Date(x.createdAt).getTime();
      return getTime(b) - getTime(a);
    });

    // Create audit log for this retrieval
    await createAuditLog(
      'audit_logs_retrieved',
      req.user?.uid || 'unknown',
      {
        filters: req.query,
        resultCount: auditLogs.length
      }
    );

    res.json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
};