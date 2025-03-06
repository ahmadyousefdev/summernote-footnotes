# summernote-Footnotes
A Summernote plugin that allows you to insert footnotes seamlessly at the cursor position while automatically appending them to the end of the editor's content.

## Installation

### Include JS
Include the following code after Summernote:

```html
<script src="summernote-footnotes.js"></script>
```

### Summernote Options
To enable the plugin in Summernote, add it to your toolbar configuration, for example:

```javascript
$('.summernote').summernote({
    toolbar: [
        ['custom', ['footnotes']],
    ],
});
```

we used [font awesome](https://fontawesome.com/) to display the footnote icon, you can use any other icon library and edit the icon in `summernote-footnotes.js` at `contents: '<i class="fa fa-superscript"></i>'`


## Example
You can find a working example in the [dist/index.html](https://github.com/ahmadyousefdev/summernote-footnotes/blob/main/dist/index.html) file.