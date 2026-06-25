import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Container, Button, Spinner, Card, Row, Col, Alert, Form } from "react-bootstrap";

// Memoized Movie Card to prevent redundant re-renders
const MovieCard = React.memo(({ movie }) => {
  return (
    <Col md={6} lg={4}>
      <Card className="movie-card h-100 border-0 p-3 shadow-sm">
        <Card.Body className="d-flex flex-column h-100">
          <Card.Title className="fw-bold fs-4 text-info mb-2 text-uppercase">
            {movie.title}
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted small fw-semibold">
            Released: {new Date(movie.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Card.Subtitle>
          <Card.Text className="text-muted flex-grow-1 overflow-auto movie-crawl" style={{ maxHeight: "150px" }}>
            {movie.openingText}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
});

MovieCard.displayName = "MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  
  const retryTimerRef = useRef(null);

  // References for form inputs to optimize performance (no re-renders on keystroke)
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const fetchMoviesHandler = useCallback(async () => {
    // Clear any existing scheduled retry timer
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      
      const data = await response.json();
      
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsRetrying(false);
    } catch (err) {
      console.error("Fetch error details:", err);
      const errorMsg = "Something went wrong ....Retrying";
      setError(errorMsg);
      setIsRetrying(true);
      
      // Retry every 5 seconds until it passes
      retryTimerRef.current = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelRetryHandler = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setIsRetrying(false);
    setError("Retrying canceled.");
  }, []);

  // Fetch movies automatically on page load
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  // Form submission handler
  const submitHandler = useCallback((event) => {
    event.preventDefault();

    const newMovieObj = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    console.log(newMovieObj);

    // Reset fields
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  }, []);

  // Memoized grid layout to avoid rebuilding cards unless the list changes
  const movieGridContent = useMemo(() => {
    if (movies.length === 0) return null;
    return (
      <Row className="g-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>
    );
  }, [movies]);

  return (
    <Container className="my-5">
      {/* Add Movie Form Section */}
      <Card 
        className="mx-auto mb-5 p-4 border-0 shadow-sm" 
        style={{ maxWidth: "600px", borderRadius: "12px", background: "white" }}
      >
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 text-start" controlId="title">
              <Form.Label className="fw-bold text-muted small text-uppercase">Title</Form.Label>
              <Form.Control 
                type="text" 
                ref={titleRef} 
                required 
                placeholder="Enter movie title" 
              />
            </Form.Group>
            
            <Form.Group className="mb-3 text-start" controlId="opening-text">
              <Form.Label className="fw-bold text-muted small text-uppercase">Opening Text</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                ref={openingTextRef} 
                required 
                placeholder="Enter opening crawl text" 
              />
            </Form.Group>
            
            <Form.Group className="mb-4 text-start" controlId="release-date">
              <Form.Label className="fw-bold text-muted small text-uppercase">Release Date</Form.Label>
              <Form.Control 
                type="date" 
                ref={releaseDateRef} 
                required 
              />
            </Form.Group>
            
            <div className="text-center">
              <Button 
                type="submit" 
                variant="info" 
                className="px-5 py-2 fw-bold text-white add-movie-btn"
              >
                Add Movie
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Fetch Control Section */}
      <div className="text-center mb-5">
        <div className="d-flex justify-content-center gap-3">
          <Button
            variant="info"
            className="px-4 py-2 fw-bold text-white fetch-movies-btn"
            onClick={fetchMoviesHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Fetching...
              </>
            ) : (
              "FETCH MOVIES"
            )}
          </Button>
          
          {isRetrying && (
            <Button
              variant="danger"
              className="px-4 py-2 fw-bold cancel-retry-btn"
              onClick={cancelRetryHandler}
            >
              CANCEL RETRY
            </Button>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="info" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted fw-semibold">Loading movies from the universe...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
          <Alert variant={error === "Retrying canceled." ? "warning" : "danger"} className="d-flex align-items-center justify-content-between p-3">
            <span>{error}</span>
            {isRetrying && (
              <Button
                variant="outline-danger"
                size="sm"
                className="fw-bold ms-3"
                onClick={cancelRetryHandler}
              >
                Cancel
              </Button>
            )}
          </Alert>
        </div>
      )}

      {!isLoading && movies.length === 0 && !error && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No movies loaded yet. Click the button to fetch movies from the backend.</p>
        </div>
      )}

      {!isLoading && movieGridContent}
    </Container>
  );
}

export default Movies;
