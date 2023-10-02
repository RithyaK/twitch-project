import { useState } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
const SubscribeModal = (props) => {
  // données
  const [subscribeModal, setSubscribeModal] = useState();
  const [confirmButton, setConfirmButton] = useState(false);
  // comportement
  function handleButtonPayment() {
    setConfirmButton(true);
  }

  function confirmPayment() {
    // let today = new Date();
    setSubscribeModal(false);
    setConfirmButton(false);
    alert("Abonnement confirmé ! ");
  }

  // render
  return (
    <SubscribeStyle>
      <button onClick={() => setSubscribeModal(true)}>
        S'abonner
        <AiOutlineStar />
      </button>
      {subscribeModal && (
        <div className="modalcontainer">
          <div className="overlay"></div>
          <div className="modalcontent">
            <div className="modalheader">
              <img src={props.streamerData.profilepicture} />
              <h3>S'abonner à {props.streamerData.name}</h3>
              <RxCross2 onClick={() => setSubscribeModal(false)} />
            </div>
            <div className="modalmid">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              aperiam autem sit inventore libero consequuntur eaque et deleniti
              expedita quam debitis cumque ducimus facere rerum aut ad, fuga
              tenetur, earum id? Doloribus magnam voluptate expedita repellendus
              voluptas eveniet blanditiis pariatur? Dolores corrupti inventore
              eius ratione soluta neque saepe sequi dicta temporibus accusantium
              dolore odit eveniet a accusamus maxime ex ut, itaque id! Facilis
              laboriosam quod cumque nemo dignissimos ipsa minus exercitationem
              mollitia voluptates fugit nisi sunt, commodi recusandae sed qui!
              Dolores, hic quia, saepe consequatur ab enim doloribus aut nam
              error eos eum ipsum necessitatibus rerum et. Fugiat, quasi
              laboriosam.
            </div>
            <div className="modalfooter">
              {confirmButton ? (
                <button onClick={confirmPayment}>Confirmer</button>
              ) : (
                <button onClick={handleButtonPayment}>4,99$</button>
              )}
            </div>
          </div>
        </div>
      )}
    </SubscribeStyle>
  );
};

export default SubscribeModal;

const SubscribeStyle = styled.div`
  button {
    align-items: center;
    display: flex;
    position: relative;
    background-color: rgba(83, 83, 95, 0.38);
    color: white;
    border: none;
  }
`;
