import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendedItem.module.css";
import CULTURE from "../../asset/category/CULTURE.png";
import ECONOMICS from "../../asset/category/ECONOMICS.png";
import POLITICS from "../../asset/category/POLITICS.png";
import ENTERTAINMENT from "../../asset/category/ENTERTAINMENT.png";
import IT from "../../asset/category/IT.png";
import SPORT from "../../asset/category/SPORT.png";
import WORLD from "../../asset/category/WORLD.png";
import SOCIAL from "../../asset/category/SOCIAL.png";


const RecommendedItem = ({index, data}) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/summary`, {state: {data}});
    }

    const getImageForCategory = (category) => {
        switch (category) {
          case 'CULTURE':
            return CULTURE;
          case 'POLITICS':
            return POLITICS;
          case 'ENTERTAINMENT':
            return ENTERTAINMENT;
          case 'ECONOMICS':
            return ECONOMICS;
          case 'IT':
            return IT;
          case 'SPORT':
            return SPORT;
          case 'WORLD':
            return WORLD;
          case 'SOCIAL':
            return SOCIAL;
          default:
            return WORLD;
        }
    };

    const SocialImage = ({ category }) => {
        const imageSrc = getImageForCategory(category);
        return <img className={styles.icon} src={imageSrc} alt="Icon" />;
    };

    const itemColor = ({index}) => {
        switch (index % 3){
            case 0:
                return '#569CA2';
            case 1:
                return '#66C2A1';
            case 2:
                return '#91CB7D';
            default:
                return '#66C2A1';
        }
    }


    return (
        <div>
            <div className={styles.wrapper} onClick={() => clickHandler()}  style={{backgroundColor: itemColor({index})}} >
                <div className={styles.iconWrapper}>
                    <SocialImage category={`${data.category}`} />
                </div>
                <div className={styles.category}>
                    {`${data.category}`.substring(0,Math.min(`${data.category}`.length ,9))}
                </div>
            </div>
        </div>
    )
}



export default RecommendedItem;