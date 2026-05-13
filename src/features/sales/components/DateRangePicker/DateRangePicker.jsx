// features/sales/components/DateRangePicker/DateRangePicker.jsx

import styles from './DateRangePicker.module.css';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

// ── Utilidades ──────────────────────────────────────────────────────────────

const toYMD = (date) => date.toISOString().split('T')[0];

const formatShort = (ymd) => {
    if (!ymd) return '';
    const [year, month, day] = ymd.split('-');
    return `${parseInt(day)} ${MONTHS[parseInt(month) - 1].slice(0, 3)} ${year}`;
};

const isSameDay = (a, b) => a && b && a === b;
const isBetween = (date, from, to) => from && to && date > from && date < to;
const isToday = (ymd) => toYMD(new Date()) === ymd;

const buildCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { offset, daysInMonth };
};

// ── Subcomponente: grid del calendario ─────────────────────────────────────

function CalendarGrid({ dateFrom, dateTo, onChange, onClose }) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selecting, setSelecting] = useState(dateFrom ? 'to' : 'from');
    const [hovered, setHovered] = useState(null);

    const { offset, daysInMonth } = buildCalendarDays(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else setViewMonth((m) => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else setViewMonth((m) => m + 1);
    };

    const handleDayClick = (ymd) => {
        if (selecting === 'from') {
            onChange({ date_from: ymd, date_to: '' });
            setSelecting('to');
        } else {
            if (ymd < dateFrom) {
                onChange({ date_from: ymd, date_to: dateFrom });
            } else {
                onChange({ date_from: dateFrom, date_to: ymd });
            }
            setSelecting('from');
            onClose();
        }
    };

    const previewFrom =
        selecting === 'to' && hovered && hovered < dateFrom
            ? hovered
            : dateFrom;
    const previewTo =
        selecting === 'to' && hovered && hovered > dateFrom ? hovered : dateTo;

    return (
        <div className={styles.calendar}>
            {/* ── Navegación ── */}
            <div className={styles.calendarNav}>
                <button className={styles.navBtn} onClick={prevMonth}>
                    <ChevronLeft size={16} />
                </button>
                <span className={styles.calendarMonth}>
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button className={styles.navBtn} onClick={nextMonth}>
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* ── Grid ── */}
            <div className={styles.calendarGrid}>
                {DAYS.map((d, i) => (
                    <div key={i} className={styles.dayName}>
                        {d}
                    </div>
                ))}

                {Array.from({ length: offset }).map((_, i) => (
                    <div key={`blank-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                    const isStart = isSameDay(ymd, previewFrom);
                    const isEnd = isSameDay(ymd, previewTo);
                    const inRange = isBetween(ymd, previewFrom, previewTo);
                    const isCurrentDay = isToday(ymd);

                    return (
                        <div
                            key={ymd}
                            className={`
                                ${styles.day}
                                ${isStart ? styles.dayStart : ''}
                                ${isEnd ? styles.dayEnd : ''}
                                ${inRange ? styles.dayInRange : ''}
                                ${isCurrentDay && !isStart && !isEnd ? styles.dayToday : ''}
                            `}
                            onClick={() => handleDayClick(ymd)}
                            onMouseEnter={() => setHovered(ymd)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* ── Hint ── */}
            <div className={styles.calendarHint}>
                {selecting === 'from'
                    ? 'Selecciona la fecha de inicio'
                    : 'Selecciona la fecha de fin'}
            </div>
        </div>
    );
}

// ── Componente principal ────────────────────────────────────────────────────

export default function DateRangePicker({ dateFrom, dateTo, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const label =
        dateFrom && dateTo
            ? `${formatShort(dateFrom)} → ${formatShort(dateTo)}`
            : dateFrom
              ? `Desde ${formatShort(dateFrom)}`
              : 'Rango de fechas';

    const clearDates = (e) => {
        e.stopPropagation();
        onChange({ date_from: '', date_to: '' });
        setOpen(false);
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            {/* ── Trigger ── */}
            <button
                className={`
                    ${styles.trigger}
                    ${open ? styles.triggerActive : ''}
                    ${dateFrom ? styles.triggerFilled : ''}
                `}
                onClick={() => setOpen((o) => !o)}
            >
                <Calendar size={14} />
                <span>{label}</span>
                {dateFrom && (
                    <span className={styles.clearBtn} onClick={clearDates}>
                        <X size={12} />
                    </span>
                )}
            </button>

            {/* ── Calendario ── */}
            {open && (
                <CalendarGrid
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}
