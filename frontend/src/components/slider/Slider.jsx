import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { slider } from "./slider";
import "./_slider.scss";

function Slider({ children, preco, prods }) {
    const params = useSearchParams();

    useEffect(() => {
        slider();
    }, []);

    useEffect(() => {
        document.getElementById("fromSlider").max = preco;
        const to = document.getElementById("toSlider");
        to.max = preco;
        to.value = preco;
        document.getElementById("toInput").value = preco;
        slider();
    }, [prods, params]);

    return (
        <div className="range_container">
            <div className="sliders_control">
                <input
                    id="fromSlider"
                    type="range"
                    defaultValue="10"
                    min="0"
                    max={preco}
                />
                <input
                    id="toSlider"
                    type="range"
                    defaultValue={preco}
                    min="0"
                    max={preco}
                />
            </div>
            <div className="form_control">
                <div className="form_control_container">
                    <input
                        className="form_control_container__time__input"
                        type="number"
                        id="fromInput"
                        defaultValue="10"
                        min="0"
                        max={preco}
                    />
                </div>
                <p className="form__p">até</p>
                <div className="form_control_container">
                    <input
                        className="form_control_container__time__input"
                        type="number"
                        id="toInput"
                        defaultValue={preco}
                        min="0"
                        max={preco}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}

export default Slider;
