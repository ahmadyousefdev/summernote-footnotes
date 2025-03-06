(function ($) {
    $.extend(true, $.summernote.plugins, {
        'footnotes': function (context) {
            var self = this;
            var ui = $.summernote.ui,
                $note = context.layoutInfo.note,
                $editable = context.layoutInfo.editable,
                options = context.options,
                lang = options.langInfo;
            var footnoteCounter = 1;

            context.memo('button.footnotes', function () {
                var button = ui.button({
                    contents: '<i class="fa fa-superscript"></i>',
                    tooltip: 'insert footnote',
                    click: function () {
                        self.showFootnoteModal();
                    }
                });
                return button.render();
            });

            this.showFootnoteModal = function () {
                var modal = `
                    <div class="modal fade" id="footnoteModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Insert Footnote</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <textarea id="footnoteText" class="form-control" placeholder="Enter footnote text"></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="insertFootnote">Insert</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                if ($('#footnoteModal').length === 0) {
                    $('body').append(modal);
                }
                $('#footnoteModal').modal('show');

                self.handleFootnoteEvents();
            };

            this.handleFootnoteEvents = function () {
                $('#insertFootnote').off('click').on('click', function () {
                    var footnoteText = $('#footnoteText').val();
                    if (footnoteText) {
                        var footnoteId = 'footnote-' + footnoteCounter;
                        var footnoteMarkup = `<sup><a href="#${footnoteId}" id="ref-${footnoteId}">[${footnoteCounter}]</a></sup>` + '<span>​</span>';
                        var footnoteEntry = `
                            <p id="${footnoteId}">
                                <a href="#ref-${footnoteId}"><sup>[${footnoteCounter}]</sup></a> ${footnoteText}
                            </p>
                        `;

                        $note.summernote('editor.restoreRange');
                        var node = document.createElement("span");
                        node.innerHTML = footnoteMarkup;
                        $note.summernote('editor.insertNode', node);

                        var $footnotes = $editable.find('#footnotes');
                        if ($footnotes.length === 0) {
                            $editable.append('<div id="footnotes"><hr/></div>');
                            $footnotes = $editable.find('#footnotes');
                        }
                        $footnotes.append(footnoteEntry);

                        // Synchronize Summernote's content
                        $note.summernote('code', $editable.html());

                        $('#footnoteModal').modal('hide');
                        footnoteCounter++;
                    }
                });

                $('#footnoteModal').on('show.bs.modal', function () {
                    $('#footnoteText').val('');
                });
            };
        }
    });
})(jQuery);
