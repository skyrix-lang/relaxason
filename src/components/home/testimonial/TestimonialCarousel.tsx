import { FC, useCallback, useEffect, useState } from "react";
import { ActionIcon, Box, Group, Paper } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import TestimonialItem from "./TestimonialItem";
import home from "../../../styles/Home.module.css";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  detail: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoplaySpeed?: number;
}

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoplaySpeed = 8000,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, autoplaySpeed);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isPaused, nextSlide, autoplaySpeed]);

  // Indicator dots for navigation
  const renderIndicators = () => {
    return testimonials.map((_, index) => (
      <Box
        key={index}
        onClick={() => setActiveIndex(index)}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: index === activeIndex ? "#3DCFBC" : "#C5F1EC",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />
    ));
  };

  return (
    <div
      className={home.testimonialsWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Paper
        shadow="sm"
        radius="lg"
        className={home.testimonialCard}
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6F9F7",
        }}
      >
        <div className={home.carouselSlider}>
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              detail={testimonial.detail}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <Group
          justify="space-between"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            padding: "0 20px",
          }}
        >
          <ActionIcon
            onClick={prevSlide}
            variant="light"
            radius="xl"
            size="lg"
            className={home.carouselButton}
          >
            <IconChevronLeft size="1.5rem" stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            onClick={nextSlide}
            variant="light"
            radius="xl"
            size="lg"
            className={home.carouselButton}
          >
            <IconChevronRight size="1.5rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Paper>

      {/* Indicator dots */}
      <Group justify="center" gap="xs" mt="md">
        {renderIndicators()}
      </Group>
    </div>
  );
};

export default TestimonialsCarousel;
