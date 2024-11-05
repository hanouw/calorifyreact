import "./LandingPageMain.css";

function LandingPageMain() {
  return (
    <>
      <section>
        <div className="container-max">
          <div className="text-container">
            <div className="Text">
              <h1 className="Title">
                Calorify 하나로 <br />
                <div>
                  <span className="Highlight">가장 쉽고 빠른</span>
                  <span> 식단 측정</span>
                </div>
              </h1>
            </div>
            <div className="desc">
              사진 한장으로 식탁 위에 있는 모든 영양성분을 알아가세요!
            </div>
            <div className="contactJoin">지금 당장 시작하기</div>
          </div>
          <figure>
            <img
              className="logo"
              width="800"
              height="200"
              src="/assets/imgs/calorify_logo.png"
              alt="mainImage"
            />
          </figure>
        </div>
      </section>
    </>
  );
}

export default LandingPageMain;
