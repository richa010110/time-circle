import {
	options,
	totalOptions,
	yearRanges,
} from '@components/HistoryTimeline/data/timelineData';
import { useHistoryTimeline } from '@components/HistoryTimeline/provider';
import { useMediaQuery } from '@hooks/useMediaQuery';
import clsx from '@utils/clsx';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TimeSliderNav from '../TimeSliderNav';
import './style.scss';

interface IPosition {
	x: number;
	y: number;
}

const TimeSlider: FC = () => {
	const { activeIndex, setActiveIndex, selectedRange, setSelectedRange } =
		useHistoryTimeline();
	const angleStep = useMemo(() => (2 * Math.PI) / totalOptions, []);

	const isTablet = useMediaQuery('(min-width: 48rem)');

	const [positions, setPositions] = useState<IPosition[]>([]);
	const [startYear, setStartYear] = useState<number>(selectedRange[0]);
	const [endYear, setEndYear] = useState<number>(selectedRange[1]);
	const animateMovementRef = useRef<number | null>(null);
	const animateYearsRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const anglesRef = useRef<number[]>([]);

	const calculateRadius = useCallback(() => {
		if (!containerRef.current) return 16.75;
		return containerRef.current.offsetWidth / 16 / 2;
	}, []);

	const calculatePositionsFromAngles = useCallback(
		(angles: number[], radius: number): IPosition[] => {
			return angles.map((angle) => ({
				x: radius * Math.cos(angle),
				y: radius * Math.sin(angle),
			}));
		},
		[]
	);

	const calculateInitialAngles = useCallback((index: number): number[] => {
		const angles: number[] = [];
		for (let i = 0; i < totalOptions; i++) {
			const angle = angleStep * (i - index) - Math.PI / 4;
			angles.push(angle);
		}
		return angles;
	}, []);

	const animateMovement = (targetIndex: number, duration: number) => {
		const startTime = performance.now();
		const radius = calculateRadius();

		const startAngles = anglesRef.current.length
			? [...anglesRef.current]
			: calculateInitialAngles(activeIndex);
		const targetAngles = calculateInitialAngles(targetIndex);

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const newAngles = startAngles.map((startAngle, i) => {
				let targetAngle = targetAngles[i];
				let angleDiff = targetAngle - startAngle;

				if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
				if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

				return startAngle + angleDiff * progress;
			});

			setPositions(calculatePositionsFromAngles(newAngles, radius));
			anglesRef.current = newAngles;

			if (progress < 1) {
				animateMovementRef.current = requestAnimationFrame(animate);
			} else {
				animateMovementRef.current = null;
			}
		};

		if (animateMovementRef.current) {
			cancelAnimationFrame(animateMovementRef.current);
		}
		animateMovementRef.current = requestAnimationFrame(animate);
	};

	const animateYears = (
		startFrom: number,
		startTo: number,
		endFrom: number,
		endTo: number,
		duration: number
	) => {
		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const currentStartYear = Math.round(
				startFrom + (startTo - startFrom) * progress
			);
			const currentEndYear = Math.round(endFrom + (endTo - endFrom) * progress);

			setStartYear(currentStartYear);
			setEndYear(currentEndYear);

			if (progress < 1) {
				animateYearsRef.current = requestAnimationFrame(animate);
			} else {
				animateYearsRef.current = null;
			}
		};

		if (animateYearsRef.current) {
			cancelAnimationFrame(animateYearsRef.current);
		}
		animateYearsRef.current = requestAnimationFrame(animate);
	};

	const handleClick = (index: number) => {
		if (index !== activeIndex) {
			setActiveIndex(index);
		}
	};

	useEffect(() => {
		if (!isTablet) {
			setPositions([]);
			if (animateMovementRef.current) {
				cancelAnimationFrame(animateMovementRef.current);
			}
			if (animateYearsRef.current) {
				cancelAnimationFrame(animateYearsRef.current);
			}

			return;
		}

		const radius = calculateRadius();
		const initialAngles = calculateInitialAngles(activeIndex);
		anglesRef.current = initialAngles;
		setPositions(calculatePositionsFromAngles(initialAngles, radius));

		const observer = new ResizeObserver(() => {
			const newRadius = calculateRadius();
			setPositions(calculatePositionsFromAngles(anglesRef.current, newRadius));
		});

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (animateMovementRef.current) {
				cancelAnimationFrame(animateMovementRef.current);
			}
			if (animateYearsRef.current) {
				cancelAnimationFrame(animateYearsRef.current);
			}
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [isTablet]);

	useEffect(() => {
		const newRange = yearRanges[activeIndex];
		setSelectedRange(newRange);

		if (positions.length > 0) {
			animateMovement(activeIndex, 1000);
			animateYears(startYear, newRange[0], endYear, newRange[1], 1000);
		}
	}, [activeIndex]);

	return (
		<div className="time-slider">
			<h1 className="time-slider__heading">Исторические&#10;даты</h1>
			<div className="time-slider__range-selector">
				<div className="years-range">
					<div className="years-range__item years-range__item--start">
						{startYear}
					</div>
					<div className="years-range__item years-range__item--end">
						{endYear}
					</div>
				</div>
				{isTablet && (
					<div
						className="time-slider__circle-selector circle-selector"
						ref={containerRef}
					>
						{positions.map(({ x, y }, index) => {
							const isActive = index === activeIndex;
							return (
								<button
									key={options[index].number}
									className={clsx(
										'circle-selector__option',
										isActive && 'selected'
									)}
									type="button"
									data-number={options[index].number}
									data-label={options[index].label}
									onClick={() => handleClick(index)}
									style={{ transform: `translate(${x}rem, ${y}rem)` }}
								/>
							);
						})}
					</div>
				)}
			</div>
			{isTablet && (
				<div className="time-slider__nav">
					<TimeSliderNav />
				</div>
			)}
		</div>
	);
};

export default TimeSlider;
