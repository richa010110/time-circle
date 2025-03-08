import { totalOptions } from '@components/HistoryTimeline/data/timelineData';
import { useHistoryTimeline } from '@components/HistoryTimeline/provider';
import { FC } from 'react';

const TimeSliderNav: FC = () => {
	const { activeIndex, setActiveIndex } = useHistoryTimeline();

	const handlePrev = () => {
		const newIndex = (activeIndex - 1 + totalOptions) % totalOptions;
		setActiveIndex(newIndex);
	};

	const handleNext = () => {
		const newIndex = (activeIndex + 1) % totalOptions;
		setActiveIndex(newIndex);
	};

	return (
		<div className="time-slider-nav">
			<div className="time-slider-nav__counter">
				{activeIndex + 1}/{totalOptions}
			</div>
			<div className="time-slider-nav__buttons">
				<button
					className="time-slider-nav__button"
					type="button"
					onClick={handlePrev}
					disabled={activeIndex === 0}
				>
					<svg width="10" height="14" viewBox="0 0 10 14" fill="none">
						<path
							d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
							stroke="#42567A"
							strokeWidth="2"
						/>
					</svg>
				</button>
				<button
					className="time-slider-nav__button"
					type="button"
					onClick={handleNext}
					disabled={activeIndex === totalOptions - 1}
				>
					<svg width="10" height="14" viewBox="0 0 10 14" fill="none">
						<path
							d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
							stroke="#42567A"
							strokeWidth="2"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default TimeSliderNav;
