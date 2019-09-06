import { ModelCtor, Model } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type Associable = {
  associate: (models: Record<string, ModelCtor<Model>>) => void;
};
