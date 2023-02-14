import { BannerSmall } from "../banner/BannerSmall";

export const About = () => {
    return (
        <>
        {/* The banner must be outside the above the section */}
            <BannerSmall currPage={'About'} />
            <h1>About Page</h1>
        </>
    );
}