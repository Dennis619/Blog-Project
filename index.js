import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];
var initialPostDelete = false;

function Post(id, name, profileImage, postTitle, postDesc, postImage) {
    this.id = id;
    this.name = name;
    this.profileImage = profileImage;
    this.postTitle = postTitle;
    this.postDesc = postDesc;
    this.postImage = postImage;
}

//post at position 0
    function postAtPositionZero(){
        let new_postDesc = "Choose a Game Engine-> The first step in game development is choosing a game engine. Game engines provide the tools and frameworks necessary to build and deploy games across different platforms. Popular game engines include Unity, Unreal Engine, and Godot. Take some time to explore different engines and choose the one that best fits your needs and skill level."
        let new_profileImage = "ndivo_animation_lana.jpg";
        let new_postTitle = "Getting Started with Game Development: A Beginner's Guide";
        let new_name = "Dennoh619";
        let new_postImage = "flying-man-cyberpunk-portrait.jpg";
        var post1 = new Post(posts.length, new_name, new_profileImage, new_postTitle, new_postDesc, new_postImage);
        posts.push(post1);
    }
var currentPage = "";

app.get("/", (req, res) => {
    console.log(posts.length + " at the beginning");
    currentPage = "home";

    if(posts.length === 0 && !initialPostDelete)
    {
        postAtPositionZero();
    }
    res.render("index.ejs", {
        currentPage: currentPage,
        posts: posts
    });
});

//on clicking post button in the create post 
app.post("/create_post", (req, res) => {
    currentPage = "home";
    var post = new Post( 
        req.body.postID,
        req.body.fullName,
        req.body.profileIMG,
        req.body.title,
        req.body.message,
        req.body.postIMG
    );
    posts.push(post);
    console.log("post create "+ post.id + " posts length is "+ posts.length);
    //redirect the user to the home page after succesful post creation 
    res.render("index.ejs", 
    {
        currentPage: currentPage,
        posts: posts
    });
});

//get create post page
app.get("/new_post", (req, res) => {
    currentPage = "newPost";
    res.render("new_post.ejs", {
        currentPage: currentPage,
        postCounter: posts.length
    });
});

app.get("/about", (req, res) => {
    currentPage = "about";
    res.render("about.ejs", {
        currentPage: currentPage
    });
});

app.get("/contact", (req, res) => {
    currentPage = "contact";
    res.render("contact.ejs", {
        currentPage: currentPage
    });
});

//get the id to edit
app.post("/get_Post_Edit", (req, res) => {
    let post_id = req.body.currentId;
    console.log(post_id);
    var editPost = posts[post_id];
    res.render("edit_post.ejs", {
        postToEdit: editPost
    });
});

app.post("/edit_post", (req, res) => {
    currentPage = "home";
    const postId = req.body.currentIdToEdit;
    console.log(postId);
    var newData = new Post(
        postId,
        req.body.fullName,
        req.body.profileIMG,
        req.body.title,
        req.body.message,
        req.body.postIMG
    );
    posts[postId] = newData;

    res.render("index.ejs", {
        currentPage: currentPage,
        posts: posts
    });
});

app.post("/delete_post", (req, res) => {
    currentPage = "home";
    const postId = req.body.currentId;
    console.log(postId);
    if(postId === 0 && !initialPostDelete)
    {
        initialPostDelete = true;
    }
    //remove the post from posts
    posts.splice(postId, 1);

    res.render("index.ejs",{
        currentPage: currentPage,
        posts: posts
    });
});


app.get("/view_post", (req, res) => {
    currentPage = "";
    res.render("view_post.ejs", {
        currentPage: currentPage
    });
});

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});