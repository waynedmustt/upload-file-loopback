'use strict';

module.exports = function(Attachment) {
  Attachment.remoteMethod(
    'upload',
    {
      description: 'Upload a file',
      accepts: [
        {
          arg: 'req',
          type: 'object',
          http: {
            source: 'req',
          },
        },
        {
          arg: 'res',
          type: 'object',
          http: {
            source: 'res',
          },
        },
      ],
      returns: {
        arg: 'data',
        type: 'object',
        root: true,
      },
      http: {
        verb: 'post',
        path: '/',
      },
    }
);

  Attachment.upload = function(req, res, callback) {
    req.params.container = 'attachments';
    Attachment.app.models.Container.upload(req, res, function(err, fileObj) {
      if (err) return callback(err);
      if (fileObj.files.file === undefined) {
        return callback(null, {
          statusCode: 400,
          message: 'Unexpected Request',
        });
      }
      callback(null, fileObj);
    });
  };
};
