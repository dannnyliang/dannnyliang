import { Box, Paper } from "@material-ui/core";
import React, { memo } from "react";

import PropTypes from "prop-types";
import { equals } from "ramda";
import marked from "marked";
import styled from "styled-components";

function Preview(props) {
  const { className, readmeContent } = props;

  return (
    <div className={className}>
      <Box className="profile-section">Github Profile</Box>
      <Paper className="readme-section" variant="outlined">
        <div
          className="readme"
          dangerouslySetInnerHTML={{ __html: marked(readmeContent) }}
        />
      </Paper>
    </div>
  );
}

Preview.propTypes = {
  className: PropTypes.string,
};

const StyledPreview = styled(Preview)`
  display: flex;
  background-color: #fff;

  .profile-section {
    flex: 1;
  }

  .readme-section {
    width: 854px;
    padding: 24px;
  }

  .readme {
    font-size: 14px;
    a {
      text-decoration: none;
    }
    a:visited {
      color: blue;
    }
    p {
      margin-top: 0;
      margin-bottom: 16px;
    }
  }
`;

export default memo(StyledPreview, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
