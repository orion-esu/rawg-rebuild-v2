import { useQuery } from '@tanstack/react-query';
import instance from '../services/url-client';
import { hrToMs } from '../services/timeConverter';
import dateGetter from '../services/dateGetter';

export const depObj = (gameQuery) => {
	const platforms = gameQuery?.selectedPlatform?.id;
	const ordering = gameQuery.orderedValue;

	return { platforms, ordering };
};

const useThisWeekReleases = (gameQuery) => {
	const { year, modifiedMonth, date, day } = dateGetter();
	const depObj = {
		platforms: gameQuery?.platformId,
		ordering: gameQuery.orderedValue,
	};

	const val = date - day + (day === 0 ? -6 : 1);
	const val1 = val + 6;
	const diffMonday = val.toString().length === 1 ? `0${val}` : val;
	const diffSunday = val1.toString().length === 1 ? `0${val1}` : val1;

	return useQuery({
		queryKey: ['this-week-releases', depObj],
		queryFn: async () => {
			const res = await instance.get('games', {
				params: {
					dates: `${year}-${modifiedMonth}-${diffMonday},${year}-${modifiedMonth}-${diffSunday}`,
					platforms: gameQuery?.platformId,
					ordering: gameQuery.orderedValue,
				},
			});
			return res.data.results;
		},
		staleTime: hrToMs(24),
	});
};

export default useThisWeekReleases;
