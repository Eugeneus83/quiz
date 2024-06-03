<template>
  <teleport to="body">
    <div class="cdk-overlay-container">
      <div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">
        <div id="cdk-overlay-0" class="cdk-overlay-pane"
             style="max-width: 80vw; pointer-events: auto; width: 350px; position: static;">
          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>
          <div tabindex="-1" aria-modal="true"
               class="mat-dialog-container ng-tns-c30-2 ng-trigger ng-trigger-dialogContainer"
               id="mat-dialog-0" role="dialog" style="transform: none;">
            <div class="mat-dialog-content">
              <slot></slot>
            </div>
            <div v-if="isActionsVisible" class="mat-dialog-actions">
              <button @click="cancel" class="mat-focus-indicator mat-stroked-button mat-button-base">
                <span class="mat-button-wrapper">Cancel</span><span class="mat-ripple mat-button-ripple"></span>
                <span class="mat-button-focus-overlay"></span>
              </button>
              <button @click="next" class="mat-focus-indicator mat-stroked-button mat-button-base">
                <span class="mat-button-wrapper">OK</span>
                <span class="mat-ripple mat-button-ripple"></span>
                <span class="mat-button-focus-overlay"></span>
              </button>
            </div>
          </div>
          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  props: {
    isActionsVisible: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel', 'next'],
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    next() {
      this.$emit('next');
    }
  }
};
</script>

<style scoped>
.mat-dialog-container {
  display: block;
  padding: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  outline: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}

.mat-dialog-content {
  font-size: x-large;
}

.mat-dialog-actions {
  padding: 8px 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 52px;
  align-items: center;
  margin-bottom: -24px;
}

.mat-stroked-button {
  border: 1px solid currentColor;
  padding: 0 15px;
  line-height: 34px;
}

.mat-stroked-button:not(.mat-button-disabled) {
  border-color: rgba(0, 0, 0, .12);
}

.mat-button, .mat-icon-button, .mat-stroked-button, .mat-flat-button {
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: baseline;
  text-align: center;
  margin: 0;
  min-width: 64px;
  line-height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  overflow: visible;
}

.mat-stroked-button .mat-button-ripple.mat-ripple, .mat-stroked-button .mat-button-focus-overlay {
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
}

.mat-button-focus-overlay {
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.35, 0, 0.25, 1), background-color 200ms cubic-bezier(0.35, 0, 0.25, 1);
}

.mat-button-ripple.mat-ripple, .mat-button-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-button-focus-overlay {
  background: #000;
}

.cdk-overlay-pane {
  pointer-events: auto;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
}

.cdk-global-overlay-wrapper, .cdk-overlay-pane {
  display: flex;
  position: absolute;
  z-index: 1000;
}

.cdk-global-overlay-wrapper, .cdk-overlay-container {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

</style>