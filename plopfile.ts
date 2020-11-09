const TEMPLATE_OPTIONS = ["all", "component", "example"];

module.exports = function (plop) {
  plop.setGenerator("template", {
    description: "generate a component or component example?",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "请选择生成模板类型?",
        default: TEMPLATE_OPTIONS[0],
        choices: TEMPLATE_OPTIONS,
      },
      {
        type: "input",
        name: "name",
        message: "请输入组件名称!",
      },
    ],
    actions: ({ type, name }) => {
      let actions = [];
      const addComponent = () => {
        actions = [
          ...actions,
          {
            type: "addMany",
            base: "plop-templates/component",
            destination: `packages/components/{{lowerCase name}}`,
            templateFiles: ["plop-templates/component/**"],
          },
        ];
      };
      const addExample = () => {
        actions = [
          ...actions,
          {
            type: "addMany",
            base: "plop-templates/example",
            destination: `example/src/pages/{{lowerCase name}}`,
            templateFiles: ["plop-templates/example/**"],
          },
        ];
      };
      if (type === "all") {
        addExample();
        addComponent();
      } else if (type === TEMPLATE_OPTIONS[1]) {
        addComponent();
      } else if (type === TEMPLATE_OPTIONS[2]) {
        addExample();
      }
      return actions;
    },
  });
};
