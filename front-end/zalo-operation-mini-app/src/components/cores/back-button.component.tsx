import React from "react";
import { Button, useNavigate } from "zmp-ui";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="secondary" fullWidth onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </>
  );
};

export default BackButton;
