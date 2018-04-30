;;; package --- Summary
;;; Commentary:

;;; python

;;; Code:

;;jedi
(add-hook 'python-mode-hook #'jedi:setup)
(setq-default jedi:complete-on-dot t)

;;autopep8
(require 'py-autopep8)
(setq-default py-autopep8-options '("--max-line-length=200"))
(setq-default flycheck-flake8-maximum-line-length 200)
(add-hook 'python-mode-hook 'py-autopep8-enable-on-save)

;;; python.el ends here
