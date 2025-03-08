import { FC } from 'react';
import HistorySlider from './elements/HistorySlider';
import TimeSlider from './elements/TimeSlider';
import { HistoryTimelineProvider } from './provider';
import './style.scss';

const HistoryTimeline: FC = () => {
	return (
		<div className="history-timeline">
			<div className="history-timeline__bg-lines">
				<div></div>
				<div></div>
			</div>
			<HistoryTimelineProvider>
				<TimeSlider />
				<HistorySlider />
			</HistoryTimelineProvider>
		</div>
	);
};

export default HistoryTimeline;
