import { useEffect, useState } from "react";
import { getBanners } from "../../context/api";
import home from "./home.module.scss";
import BannersItem from "./BannersItem";

// const banners = [
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/ab25ff4f-f5b5-4593-8483-cfe9474559d5___cebe96ffcd3e65220a7c2572772b71e7.jpg",
//         alt: "Banner Camisas A Partir De R$89. Ganhe até 25% em 4 ou mais peças",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/1f0f9f3a-f329-41ce-ba65-0b211a010732___223bbad1bc87c5fc64877b050c4d593b.jpg",
//         alt: "Banner Bermudas A Partir De R$279",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/8ff12461-3dc7-42b4-b6d9-c2ad01ab8f53___3072a9d3ca6399902aafe676724eb720.jpg",
//         alt: "Banner Polos A Partir de R$239",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/6e3c5f6f-4690-4157-90cf-90f652a4d44e___2ea32397030eaa38a1d068f7d1af599f.jpg",
//         alt: "Banner Calças A Partir de R$349",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/dc40c045-cc4a-4115-b2a2-339becf576ae___bab087007a314d5d74665351a41ddc57.jpg",
//         alt: "Banner Camisas A Partir de R$342",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/938ee31c-fecd-4acf-831d-3e91ac0c7650___58959e4ab33e124bd5f0647fd696ed76.jpg",
//         alt: "Banner Calçados Até 20% OFF no seu novo pisante",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/e4fa3626-ad30-4c18-93ff-cbadafe801fb___1f35d2c652750b9ce2c418f097b652b5.jpg",
//         alt: "Banner Infantil Até 30% OFF Pra Renovar O Closet",
//     },
//     {
//         link: "#",
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/db4021f4-6b4b-453a-a73d-903fdfbdc039___5b54152c8006988cebfa081c8391d1c8.jpg",
//         alt: "Banner Feminino Até 50% pra elas",
//     },
// ];

function Banners() {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await getBanners();
            setBanners(data);
        })();
    }, []);

    return (
        <section className={home["banners"]}>
            {banners.length > 0 ? (
                <div className={home["banners__container"]}>
                    {banners.map((obj, i) => (
                        <BannersItem key={i} {...obj} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </section>
    );
}

export default Banners;
