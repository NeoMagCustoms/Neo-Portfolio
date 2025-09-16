module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  
  // Collections
  eleventyConfig.addCollection("artworks", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artworks/*.md");
  });
  
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  
  return { dir: { input: "src", output: "_site" } };
};
