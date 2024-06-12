/* eslint-disable no-restricted-globals */
self.onmessage = async (event) => {
    const { URL, options } = event.data;

    try {
        const response = await fetch(URL, options);
        if (response.status === 200) {
            const data = await response.json();
            self.postMessage({ data: data.feedbacks.data });
        }
        if (response.status === 500) {
            self.postMessage({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('FETCH_FEEDBACKS: ', error);
        self.postMessage({ error: 'Something went wrong' });
    }
};
