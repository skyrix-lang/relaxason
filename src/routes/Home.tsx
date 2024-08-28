import { FunctionComponent, useRef } from "react";
import { Container, Image, Flex, Card, AspectRatio, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import classes from "../styles/Home.module.css";

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const mockdata = [
    {
      title: "Top 10 des endroits à visiter en Norvège cet été",
      image:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "18 Août 2022",
    },
    {
      title: "Les plus belles forêts de l'Amérique du Nord",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "27 Août 2022",
    },
    {
      title: "Revue sur les plages d'Hawaii : mieux que ce que vous pensez",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "9 Septembre 2022",
    },
    {
      title:
        "Montagnes la nuit : les 12 plus beaux endroits pour admirer la vue",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "12 Septembre 2022",
    },
  ];

  const cards = mockdata.map((article) => (
    <Carousel.Slide key={article.title}>
      <Card
        key={article.title}
        p="md"
        radius="md"
        component="a"
        href="#"
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} />
        </AspectRatio>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          {article.date}
        </Text>
        <Text className={classes.title} mt={5}>
          {article.title}
        </Text>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Flex align={"center"}>
      <Carousel
        slideSize="50%"
        height={450}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        slideGap="sm"
        controlSize={30}
        loop
      >
        {cards}
      </Carousel>
    </Flex>
  );
};

export default Home;
