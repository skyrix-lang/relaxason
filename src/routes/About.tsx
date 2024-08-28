import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Flex } from "@mantine/core";

interface IAboutProps {}

const About: FunctionComponent<IAboutProps> = () => {
  return (
    <Flex align={"center"}>
      <Link to={"/"}>
        <Button color={"red"} size={"md"} />
      </Link>
    </Flex>
  );
};

export default About;
