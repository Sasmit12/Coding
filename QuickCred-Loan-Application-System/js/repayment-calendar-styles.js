// Calendar styling methods for RepaymentCalendar class

RepaymentCalendar.prototype.addCalendarStyles = function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Calendar Styles */
        .calendar-container {
            background: white;
            border-radius: var(--rounded-lg);
            box-shadow: var(--shadow-sm);
            overflow: hidden;
            padding: var(--space-4);
        }
        
        .calendar-controls {
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
        
        .calendar-month-display {
            font-weight: 600;
            min-width: 100px;
            text-align: center;
        }
        
        .btn-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--rounded-full);
            background: var(--gray-100);
            border: none;
            color: var(--gray-700);
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-icon:hover {
            background: var(--gray-200);
            color: var(--gray-900);
        }
        
        .calendar-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-8);
            color: var(--gray-500);
            gap: var(--space-2);
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
        }
        
        .calendar-header {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
            margin-bottom: 4px;
        }
        
        .calendar-weekday {
            text-align: center;
            font-weight: 600;
            font-size: 0.75rem;
            color: var(--gray-500);
            padding: var(--space-1);
        }
        
        .calendar-day {
            aspect-ratio: 1/1;
            padding: var(--space-1);
            border-radius: var(--rounded-md);
            border: 1px solid var(--gray-100);
            position: relative;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
        }
        
        .calendar-day:hover {
            background: var(--gray-50);
            border-color: var(--gray-200);
        }
        
        .calendar-day.outside-month {
            background: var(--gray-50);
            color: var(--gray-400);
        }
        
        .calendar-day.today {
            background: var(--primary-50);
            border-color: var(--primary-200);
        }
        
        .day-number {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 2px;
        }
        
        .day-content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .payment-indicator {
            font-size: 0.6875rem;
            padding: 1px 3px;
            border-radius: var(--rounded-sm);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            gap: 2px;
        }
        
        .payment-upcoming {
            background: var(--warning-50);
            color: var(--warning-800);
        }
        
        .payment-due {
            background: var(--error-50);
            color: var(--error-800);
        }
        
        .payment-paid {
            background: var(--success-50);
            color: var(--success-800);
        }
        
        .payment-overdue {
            background: var(--error-100);
            color: var(--error-800);
            font-weight: 600;
        }
        
        /* Calendar Legend */
        .calendar-legend {
            display: flex;
            gap: var(--space-4);
            margin-top: var(--space-4);
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: var(--space-2);
            font-size: 0.75rem;
        }
        
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: var(--rounded-sm);
        }
        
        .color-upcoming {
            background: var(--warning-50);
            border: 1px solid var(--warning-200);
        }
        
        .color-due {
            background: var(--error-50);
            border: 1px solid var(--error-200);
        }
        
        .color-paid {
            background: var(--success-50);
            border: 1px solid var(--success-200);
        }
        
        .color-overdue {
            background: var(--error-100);
            border: 1px solid var(--error-300);
        }
        
        /* Payment details tooltip */
        .payment-details {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border-radius: var(--rounded-md);
            box-shadow: var(--shadow-lg);
            width: 280px;
            z-index: 100;
            padding: var(--space-3);
            font-size: 0.875rem;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s ease;
            pointer-events: none;
        }
        
        .calendar-day:hover .payment-details {
            visibility: visible;
            opacity: 1;
            transform: translateX(-50%) translateY(-5px);
        }
        
        .payment-details-title {
            font-weight: 600;
            margin-bottom: var(--space-2);
            color: var(--gray-900);
        }
        
        .payment-details-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-2);
        }
        
        .payment-details-item {
            display: flex;
            justify-content: space-between;
            padding-bottom: var(--space-2);
            border-bottom: 1px solid var(--gray-100);
        }
        
        .payment-details-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        
        .payment-loan-type {
            font-weight: 500;
            color: var(--gray-800);
        }
        
        .payment-amount {
            font-weight: 600;
            color: var(--gray-900);
        }
        
        .payment-status {
            font-size: 0.75rem;
            padding: 1px 6px;
            border-radius: 12px;
            font-weight: 500;
        }
        
        .status-upcoming {
            background: var(--warning-50);
            color: var(--warning-800);
        }
        
        .status-due {
            background: var(--error-50);
            color: var(--error-800);
        }
        
        .status-paid {
            background: var(--success-50);
            color: var(--success-800);
        }
        
        .status-overdue {
            background: var(--error-100);
            color: var(--error-800);
        }
        
        .calendar-empty {
            padding: var(--space-8);
            text-align: center;
            color: var(--gray-500);
        }
        
        .calendar-empty i {
            font-size: 2rem;
            color: var(--gray-300);
            margin-bottom: var(--space-2);
        }
        
        .calendar-empty p {
            margin-bottom: var(--space-4);
        }

        /* Repayment Schedule Modal Styles */
        .repayment-schedule {
            max-width: 800px;
            margin: 0 auto;
        }

        .repayment-schedule-header {
            margin-bottom: var(--space-4);
        }

        .loan-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-4);
            margin-bottom: var(--space-4);
            background: var(--gray-50);
            padding: var(--space-4);
            border-radius: var(--rounded-lg);
        }

        .loan-detail-item {
            display: flex;
            flex-direction: column;
        }

        .loan-detail-label {
            font-size: 0.75rem;
            color: var(--gray-500);
            margin-bottom: var(--space-1);
        }

        .loan-detail-value {
            font-weight: 600;
            color: var(--gray-900);
        }

        .payment-summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--space-4);
        }

        .payment-summary-item {
            text-align: center;
            flex: 1;
            padding: var(--space-3);
            background: white;
            border-radius: var(--rounded-lg);
            box-shadow: var(--shadow-sm);
        }

        .payment-summary-value {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: var(--space-1);
            color: var(--gray-900);
        }

        .payment-summary-label {
            font-size: 0.75rem;
            color: var(--gray-600);
        }

        .payment-schedule-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: var(--space-4);
        }

        .payment-schedule-table th {
            text-align: left;
            padding: var(--space-3);
            background: var(--gray-100);
            font-weight: 600;
            color: var(--gray-700);
            font-size: 0.875rem;
        }

        .payment-schedule-table td {
            padding: var(--space-3);
            border-bottom: 1px solid var(--gray-100);
            font-size: 0.875rem;
        }

        .payment-schedule-table tr:last-child td {
            border-bottom: none;
        }

        .payment-schedule-table .payment-status {
            display: inline-block;
        }

        .payment-actions {
            display: flex;
            gap: var(--space-2);
        }

        .payment-schedule-summary {
            margin-top: var(--space-6);
            padding-top: var(--space-4);
            border-top: 1px solid var(--gray-200);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .payment-total {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--gray-900);
        }

        .payment-total-breakdown {
            color: var(--gray-600);
            font-size: 0.875rem;
            margin-top: var(--space-1);
        }

        /* Error state */
        .calendar-error {
            padding: var(--space-8);
            text-align: center;
            color: var(--error-600);
        }

        .calendar-error i {
            font-size: 2rem;
            margin-bottom: var(--space-4);
        }

        .calendar-error p {
            margin-bottom: var(--space-4);
        }

        /* Responsive calendar */
        @media (max-width: 768px) {
            .calendar-grid {
                gap: 2px;
            }
            
            .calendar-day {
                padding: 2px;
            }
            
            .day-number {
                font-size: 0.75rem;
            }
            
            .payment-indicator {
                font-size: 0.625rem;
                padding: 0 2px;
            }
        }
    `;
    document.head.appendChild(styleElement);
};