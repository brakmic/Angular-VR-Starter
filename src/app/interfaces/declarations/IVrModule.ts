import { VrModuleType } from '../../enums';

export interface IVrModule {
    id: string;
    name: string;
    type: VrModuleType;
    markup: string;
    scripts?: string[];
}
