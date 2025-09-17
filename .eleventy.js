module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" }); // <-- ensure CSS ships

  // Ensure artworks collection is available
  eleventyConfig.addCollection("artworks", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artworks/*.md");
  });

  return { dir: { input: "src", output: "_site" } };
};
