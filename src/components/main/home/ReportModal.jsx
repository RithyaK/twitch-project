import { RxCross2 } from "react-icons/rx";
const ReportModal = (props) => {
  return (
    <div className="modalcontainer">
      <div className="overlay"></div>
      <div className="modalcontent">
        <div className="modalheader">
          <h3>Signaler {props.streamername} </h3>
          <RxCross2 onClick={() => props.setOpenModal(false)} />
        </div>
        <div className="modalmid">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
            unde, ad aliquid deleniti ratione, in obcaecati nemo tenetur sunt
            deserunt quia tempora laborum quo laudantium consequatur eligendi
            odio vel iusto sed blanditiis nisi rem quae. Dolorum, maiores illo?
            Eaque iste eius totam! Tempora laborum rerum incidunt impedit, vitae
            temporibus non recusandae nisi dolorem commodi consequuntur
            quibusdam qui veniam, quos, fugit suscipit quis possimus totam
            obcaecati eum magnam molestiae vero? Minus quaerat, qui aperiam sint
            vero nulla odio, dignissimos adipisci maxime, voluptate impedit
            architecto molestias possimus veniam ipsam? Laborum fuga blanditiis,
            similique hic sunt nemo distinctio consequuntu
          </p>
        </div>
        <div className="modalfooter">
          <button
            onClick={() => {
              props.setOpenModal(false);
              alert("Signalement confirmé !");
            }}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
