;;; package --- Summary
;;; Commentary:

;;; Key customize

;;; Code:

;; C-hで前一文字削除
(global-set-key [(control h)]	'delete-backward-char)
;; S-SPCで半角-全角切り替え
(global-set-key (kbd "S-SPC")	'toggle-input-method)
;; M-gで指定した行へジャンプ
(global-set-key [(meta g)]	'goto-line)
;; M-cで範囲内文字数をカウント
(global-set-key [(meta c )]	'count-lines-region)
;; C-c C-rでバッファを再評価
(define-key global-map (kbd "C-c C-r")     'eval-buffer)
;; tabキーでspaceでインデント
(setq-default indent-tabs-mode nil)

;;; key-customize.el ends here

