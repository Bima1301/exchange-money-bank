import toast from "react-hot-toast";

export const validateTotalExchange = (totalExchange: any) => {
    let newError = [] as any;
    totalExchange.map((item: any, index: number) => {
        if (item.type === 'Lembar' && (Number(item.total) < 100 || Number(item.total) > 200)) {
            newError.push({
                key: index,
                value: "Jumlah lembar harus diantara 100 - 200"
            })
        }
        else if (item.type === 'Koin' && (Number(item.total) < 250 || Number(item.total) > 500)) {
            newError.push({
                key: index,
                value: "Jumlah koin harus diantara 250 - 500"
            })
        }
    });
    return newError;
}

export const getURL = (path: string) => {
    const IS_SERVER = typeof window === "undefined";
    const baseURL = IS_SERVER
        ? process.env.NEXT_PUBLIC_SITE_URL!
        : window.location.origin;
    return new URL(path, baseURL).toString();
}