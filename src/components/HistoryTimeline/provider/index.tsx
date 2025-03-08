import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { yearRanges } from '../data/timelineData';

interface IHistoryTimelineContext {
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
	selectedRange: [number, number];
	setSelectedRange: Dispatch<SetStateAction<[number, number]>>;
}

const HistoryTimelineContext = createContext<
	IHistoryTimelineContext | undefined
>(undefined);

export const HistoryTimelineProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [selectedRange, setSelectedRange] = useState<[number, number]>(
		yearRanges[0]
	);

	const value = {
		activeIndex,
		setActiveIndex,
		selectedRange,
		setSelectedRange,
	};

	return (
		<HistoryTimelineContext.Provider value={value}>
			{children}
		</HistoryTimelineContext.Provider>
	);
};

export const useHistoryTimeline = (): IHistoryTimelineContext => {
	const context = useContext(HistoryTimelineContext);
	if (context === undefined) {
		throw new Error(
			'useHistoryTimeline можно использовать только в HistoryTimelineProvider'
		);
	}
	return context;
};
