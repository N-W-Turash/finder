import React from "react";
import PropTypes from "prop-types";
import Marker from "../../assets/imgs/marker.svg";
import Type from "../../assets/imgs/type.svg";
import Phone from "../../assets/imgs/phone.svg";
import { ListItem } from "../index";

export class ListView extends React.Component {

    render() {

        /**
         * This component gets address, categoryName, phone as props from the parent component. 
         * All of these props are string. 
         * 
         */
        
        const  { address, categoryName, phone } = this.props;
        const listItems = [
            {
                imgSrc: Marker,
                text: address,
            },
            {
                imgSrc: Type,
                text: categoryName,
            },
            {
                imgSrc: Phone,
                text: phone,
            },
        ];

        return (
            <ul className="list-group custom-list-group list-group-flush mb-2">
                {
                    listItems.map((listItem, index) => {
                        return <ListItem imgSrc={listItem.imgSrc} text={listItem.text} key={index}/>
                    })
                }
            </ul>      
        );
    }
}

ListView.propTypes = {
    address: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

