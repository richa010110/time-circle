import {
	historyData,
	IHistoryItem,
} from '@components/HistoryTimeline/data/historyData';
import { useHistoryTimeline } from '@components/HistoryTimeline/provider';
import { useMediaQuery } from '@hooks/useMediaQuery';
import clsx from '@utils/clsx';
import { FC, useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import TimeSliderNav from '../TimeSliderNav';
import './style.scss';

const HistorySlider: FC = () => {
	const { selectedRange } = useHistoryTimeline();

	const isTable = useMediaQuery('(min-width: 48rem)');

	const [startYear, endYear] = selectedRange;
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const [visibleData, setVisibleData] = useState<IHistoryItem[]>([]);
	const [animationState, setAnimationState] = useState<
		'entering' | 'exiting' | 'stable'
	>('stable');

	useEffect(() => {
		const filteredData = historyData.filter(
			(item) => item.year >= startYear && item.year <= endYear
		);

		let exitTimeout: NodeJS.Timeout;
		let enterTimeout: NodeJS.Timeout;

		setAnimationState('exiting');

		exitTimeout = setTimeout(() => {
			setVisibleData(filteredData);
			setAnimationState('entering');

			if (swiperInstance) {
				swiperInstance.slideTo(0);
			}

			enterTimeout = setTimeout(() => {
				setAnimationState('stable');
			}, 500);
		}, 500);

		return () => {
			clearTimeout(exitTimeout);
			clearTimeout(enterTimeout);
		};
	}, [startYear, endYear, swiperInstance]);

	return (
		<div className="history-slider">
			<div
				className={clsx(
					'history-slider__row',
					`history-slider__row--${animationState}`
				)}
			>
				{isTable && (
					<button className="swiper-button swiper-button-prev" type="button">
						<svg width="8" height="12" viewBox="0 0 8 12" fill="none">
							<path d="M7 11L2 6L7 1" stroke="#3877EE" strokeWidth="2" />
						</svg>
					</button>
				)}
				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={15}
					slidesPerView={1.5}
					navigation={
						isTable
							? {
									prevEl: '.history-slider .swiper-button-prev',
									nextEl: '.history-slider .swiper-button-next',
							  }
							: false
					}
					pagination={
						!isTable
							? {
									el: '.history-slider .swiper-pagination',
									clickable: true,
							  }
							: false
					}
					onSwiper={(swiper) => setSwiperInstance(swiper)}
					breakpoints={{
						580: {
							spaceBetween: 30,
							slidesPerView: 2,
						},
						768: {
							spaceBetween: 45,
							slidesPerView: 2.5,
						},
						992: {
							spaceBetween: 60,
							slidesPerView: 3,
						},
						1280: {
							spaceBetween: 80,
							slidesPerView: 3.5,
						},
					}}
				>
					{visibleData.map((history) => (
						<SwiperSlide key={history.year} className="history-slider__slide">
							<div className="history-slider__slide-year">{history.year}</div>
							<p className="history-slider__slide-text">{history.text}</p>
						</SwiperSlide>
					))}
				</Swiper>
				{isTable && (
					<button className="swiper-button swiper-button-next" type="button">
						<svg width="8" height="12" viewBox="0 0 8 12" fill="none">
							<path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
						</svg>
					</button>
				)}
			</div>
			{!isTable && (
				<div className="history-slider__footer">
					<TimeSliderNav />
					<div className="swiper-pagination"></div>
				</div>
			)}
		</div>
	);
};

export default HistorySlider;
