import { Container, Button } from "react-bootstrap";

const toursList = [
  { date: "JUL 16", place: "DETROIT, MI", specPlace: "DTE ENERGY MUSIC THEATRE" },
  { date: "JUL 19", place: "TORONTO, ON", specPlace: "BUDWEISER STAGE" },
  { date: "JUL 22", place: "BRISTOW, VA", specPlace: "JIGGY LUBE LIVE" },
  { date: "JUL 29", place: "PHOENIX, AZ", specPlace: "AK-CHIN PAVILION" },
  { date: "AUG 2", place: "LAS VEGAS, NV", specPlace: "T-MOBILE ARENA" },
  { date: "AUG 7", place: "CONCORD, CA", specPlace: "CONCORD PAVILION" },
];

function Home() {
  return (
    <section id="tours" className="my-5">
      <Container>
        <h2 className="text-center mb-4">TOURS</h2>
        <div className="tours-container">
          {toursList.map((tour, index) => (
            <div key={index} className="tour-item">
              <span className="tour-date">{tour.date}</span>
              <span className="tour-place">{tour.place}</span>
              <span className="tour-spec-place">{tour.specPlace}</span>
              <Button className="buy-btn btn-info text-white fw-bold">
                BUY TICKETS
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Home;