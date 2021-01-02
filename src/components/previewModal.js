import React from "react";

export const PreviewModal = ({ output }) => (
  <div
    className="modal fade"
    id="previewModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Preview Modal
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={{ __html: output }}
        />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
);
