import { useRef, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import { PictureOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formwrapper: {
    width: "56%",
    margin: "0 auto",
    marginTop: "5px",
  },
  inputtextbox: {
    textAlign: "center",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25vh",
    },
  },
  formRoot: {
    display: "flex",
    height: theme.typography.fontSize * 2,
  },
  paper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },

  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "90%",
  },

  input: {
    display: "none",
  },
}));

const UpdateForm = (props) => {
  const id = props.match.params.id;

  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputAuthorRef = useRef();
  const inputPwdRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const [imagesUpdate, setImagesUpdate] = useState();
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log("--imageList, addUpdateIndex ---");
    console.log(imageList, addUpdateIndex);
    setImagesUpdate(imageList);
  };

  console.log("---images---");
  console.log(imagesUpdate);

  const [board, setBoard] = useState({
    id: "",
    postTitle: "",
    postContent: "",
    postDate: "",
    postImage: "",
    postLike: "",
    postPwd: "",
    postAuthor: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/board/` + id)
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, []);

  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("???????????? 1???????????? ????????? ??? ????????????");
    }
  };

  const save = () => {
    if (window.confirm("?????????????????????????")) {
      if (imagesUpdate == null || undefined) {
        dispatch(
          {
            type: "MODIFY_BOARD",
            payload: {
              id,
              postTitle: inputTitleRef.current.value,
              postContent: inputContentRef.current.value,
              postAuthor: inputAuthorRef.current.value,
              postPwd: inputPwdRef.current.value,
              postImage: "",
            },
          },
          alert("?????????????????????."),
          history.push("/board")
        );
      } else {
        dispatch(
          {
            type: "MODIFY_BOARD",
            payload: {
              id,
              postTitle: inputTitleRef.current.value,
              postContent: inputContentRef.current.value,
              postAuthor: inputAuthorRef.current.value,
              postPwd: inputPwdRef.current.value,
              postImage: imagesUpdate[0].data_url,
            },
          },
          alert("?????????????????????."),
          history.push("/board")
        );
      }
    }
  };

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Community</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <form className={classes.root} noValidate autoComplete="off">
              <h3>??????</h3>
              <TextField
                className={classes.field}
                label="????????? ???????????????."
                variant="outlined"
                fullWidth
                required
                inputRef={inputTitleRef}
                name="postTitle"
                onChange={changeValue}
                value={board.postTitle}
              />
              <h3>?????????</h3>
              <TextField
                className={classes.field}
                label="???????????? ???????????????."
                variant="outlined"
                fullWidth
                required
                inputRef={inputAuthorRef}
                name="postAuthor"
                onChange={changeValue}
                value={board.postAuthor}
              />
              <h3>??????</h3>
              <TextField
                className={classes.field}
                label="????????? ???????????????."
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                required
                onChange={changeValue}
                inputRef={inputContentRef}
                name="postContent"
                value={board.postContent}
              />
              <h3>????????????</h3>
              <TextField
                className={classes.field}
                label="??????????????? ???????????????."
                variant="outlined"
                required
                onChange={changeValue}
                inputRef={inputPwdRef}
                name="postPwd"
              />
              <h3>??????</h3>
            </form>
            <ImageUploading
              multiple
              value={imagesUpdate}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              onError={onError}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <PictureOutlined /> ????????????
                  </Button>
                  &nbsp;
                  {/* <Button onClick={onImageRemoveAll}>Remove all images</Button> */}
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button
                          color="primary"
                          onClick={() => onImageUpdate(index)}
                        >
                          ??????
                        </Button>
                        <Button onClick={() => onImageRemove(index)}>
                          ??????
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "90%" }}
              onClick={save}
            >
              ??????
            </Button>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={1} />
        </Hidden>
      </Grid>
    </>
  );
};

export default UpdateForm;
