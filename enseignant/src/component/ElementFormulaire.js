import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import "./ElementFormulaire.css"

export default function ElementFormulaire() {
    return (
        <div className="element">
            <div className="element_img">
            </div>
            <div className="element_detail">
                <div>Formulaire sans titre</div>
                <div>
                    <FontAwesomeIcon className="fontcss" icon={faFileAlt} />
                    <div>22-5-2020</div>
                </div>
            </div>
        </div>
    )
}
