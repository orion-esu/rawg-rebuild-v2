import url from '../services/url-client';
import { useEffect, useState } from 'react';

const useLatest = (path, gameQuery) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [dataFetched, setDataFetched] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		setIsLoading(true);

		async function getPost() {
			try {
				const res = await url.get(path, {
					signal: controller.signal,

					params: {
						platforms: gameQuery?.selectedPlatform?.id,
						ordering: gameQuery.orderedValue,
					},
				});

				if (res.data.results.length === 0)
					throw Error('No Games in this platform');

				setError('');
				setData(res.data.results);
				setDataFetched(true);
			} catch (error) {
				if (error.message !== 'canceled') setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		getPost();

		return () => controller.abort();
	}, [gameQuery.selectedPlatform, gameQuery.orderedValue]);

	if (!dataFetched) return { data: [], error: '', isLoading: true };

	return { data, error, isLoading };
};

export default useLatest;
