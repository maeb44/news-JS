import type { CallbackFn, SourceResponse } from '../../../types';

type Options = { sources?: string; apiKey?: string };

type SearchParams = {
    endpoint: string;
    options?: Options;
};

type MethodOfLoad = 'GET';

interface ILoader {
    getResp(searchParams: SearchParams, callback: CallbackFn<SourceResponse>): void;
    errorHandler(res: Response): Response;
    makeUrl(options: Options, endpoint: string): string;
    load(method: MethodOfLoad, endpoint: string, callback: CallbackFn<SourceResponse>, options: Options): void;
}

class Loader implements ILoader {
    private baseLink: string;
    private options: Options;
    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp<T>({ endpoint, options = {} }: SearchParams, callback: CallbackFn<T>) {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        for (const [key, value] of Object.entries(urlOptions)) {
            if (value !== undefined && value !== '' && value !== null) {
                url += `${key}=${value}&`;
            }
        }
        return url.slice(0, -1);
    }

    load<T>(method: MethodOfLoad, endpoint: string, callback: CallbackFn<T>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => {
                if (!data) {
                    throw new Error();
                }
                return callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
