import { FiX } from "react-icons/fi";

import "./styles.css";

function Modal({ content, close }) {
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiX color="#d3293a" size={23} />
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>

                    <div className="row">
                        <span>
                            <strong>Cliente:</strong> <i>{content.cliente}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            <strong>Assunto:</strong> <i>{content.assunto}</i>
                        </span>

                        <span style={{ marginLeft: "1.3rem"}}>
                            <strong>Cadastrado em:</strong> <i>{content.createdFormat}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            <strong>Status:</strong> 
                            <i className="status-badge" style={{ padding: ".3rem .5rem", fontSize: "1rem", backgroundColor: content.status === "Aberto" ? "#5cb85c" : "#999" }}>
                                {content.status}
                            </i>
                        </span>
                    </div>

                    {content.complemento !== "" && (
                        <>
                            <h3>Complemento</h3>
                            <p>{content.complemento}</p>
                        </>
                    )}
                        
                </main>
            </div>
        </div>
    );
}

export default Modal;