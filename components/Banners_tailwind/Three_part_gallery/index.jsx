import Emoji from "./Emoji_picker"
import Hottest_titles from "./Hottest_titles"
import Popular_offers from "./Popular_offers";
import "./styled.component.css";

export default async function Three_part_gallery() {

    return (
        <>
            <div className="main__container">
                <div className="flex justify-start flex-col md:flex-row">
                    <div className="basis-1/3">
                        <Hottest_titles />

                    </div>
                    <div className="basis-2/3 right-c">
                        <Emoji />
                        <Popular_offers />
                    </div>
                </div>
            </div>
        </>
    );
}


