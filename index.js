import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function Post(id, name, profileImage, postTitle, postDesc, postImage) {
    this.id = id;
    this.name = name;
    this.profileImage = profileImage;
    this.postTitle = postTitle;
    this.postDesc = postDesc;
    this.postImage = postImage;
}
var currentPage = "";

app.get("/", (req, res) => {
    currentPage = "home";
    res.render("index.ejs", {
        currentPage: currentPage,
        posts: posts
    });
});
//get about page
app.get("/about", (req, res) => {
    currentPage = "about";
    res.render("about.ejs", {
        currentPage: currentPage
    });
});
//get contact page
app.get("/contact", (req, res) => {
    currentPage = "contact";
    res.render("contact.ejs", {
        currentPage: currentPage
    });
});

//get create post page
app.get("/new_post", (req, res) => {
    currentPage = "";
    res.render("modify.ejs", {
        currentPage: currentPage,
        Header: "New Post"
    });
});
//on clicking post button in the create post 
app.post("/create_post", (req, res) => {
    currentPage = "home";
    var post = new Post( 
        posts.length,
        req.body.fullName,
        req.body.profileIMG,
        req.body.title,
        req.body.message,
        req.body.postIMG
    );
    posts.push(post);
    console.log("post create "+ post);
    //redirect the user to the home page after succesful post creation 
    res.redirect("/");
});

//get the id to edit
app.get("/get_Post_Edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const editPost = posts.find((post) => post.id === id);
    if(!editPost)
        res.status(404).json({ error:"PAge Not Found" });
    res.render("modify.ejs", {
        Header: "Edit Post",
        postToEdit: editPost
    });
});
//edit post with patch
app.post("/edit_post/:id", (req, res) => {
    const postId = parseInt(req.params.id);

    const existingPost = posts.find((post) => post.id === postId);
    if(!existingPost)
        res.status(404).json({ error:"Page Not Found" });

    var newData = {
        id:postId,
        name: req.body.fullName || existingPost.name,
        profileImage: req.body.profileImage || existingPost.profileImage,
        postTitle: req.body.title || existingPost.postTitle,
        postDesc: req.body.message || existingPost.postDesc,
        postImage:req.body.postImage || existingPost.postImage
    };
    const indexToUpdate = posts.findIndex((post) => post.id === postId);
    posts[indexToUpdate] = newData;
    console.log(newData);

    res.redirect("/").json(newData);
});

//delete existing post
app.post("/delete_post/:id", (req, res) => {
    currentPage = "home";
    const postId = parseInt(req.params.id);

    const existingPost = posts.find((post) => post.id === postId);
    if(!existingPost)
        res.status(404).json({ error:"Page Not Found" });

    const indexToDelete = posts.findIndex((post) => post.id === postId);
    posts.splice(indexToDelete, 1);
    res.redirect("/");
});

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

var posts = [
    {
        id: 0,
        name: "Dennoh619",
        profileImage : "ndivo_animation_lana.jpg",
        postTitle: "Getting Started with Game Development: A Beginner's Guide",
        postDesc: "Choose a Game Engine-> The first step in game development is choosing a game engine. Game engines provide the tools and frameworks necessary to build and deploy games across different platforms. Popular game engines include Unity, Unreal Engine, and Godot. Take some time to explore different engines and choose the one that best fits your needs and skill level.",
        postImage: "flying-man-cyberpunk-portrait.jpg"
    },
    {
        id: 1,
        name: "Amabel",
        profileImage : "ndivo_animation_lana.jpg",
        postTitle: "The Rise of Decentralized Finance",
        postDesc: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        postImage: "flying-man-cyberpunk-portrait.jpg"
    }
];