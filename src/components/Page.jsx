import React, { useEffect, useState } from "react";
import Container from "./Container";

const Page = (props) => {
  useEffect(() => {
    // set title
    document.title = `${props.title} | ComplexApp`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <Container wide={props.wide}>{props.children}</Container>;
};

export default Page;
