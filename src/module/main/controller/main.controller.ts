import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import httpStatus from "http-status";
import { SuccessResponse } from "../../../../src/shared/utils/response.util";
import MainService from "../service/main.service";

@injectable()
export default class mainController {
    constructor(
        private readonly mainService: MainService,
    ){}

    public getValue =  async (req: Request<{}, {}, any>, res: Response) => {
        const response = await this.mainService.getAllKeyStore();
        return res.status(httpStatus.OK).send(SuccessResponse("Key stores retrieved", response))
    }

    public getValueById =  async (req: Request<{}, {}, any>, res: Response) => {
        const {key} = req.params
        const response = await this.mainService.getSingleKeyStore(key)
        return res.status(httpStatus.OK).send(SuccessResponse("key store retrieved!", response))
    }

    public addValue =  async (req: Request<{}, {}, any>, res: Response) => {
        const requestBody = req.body;
        console.log(requestBody)
        await this.mainService.addKeyStore(req.body)
    return res.status(httpStatus.OK).send(SuccessResponse("new data added succesfully"))
    }

    public updateValue =  async (req: Request<{}, {}, any>, res: Response) => {
        const {key} = req.params
        const data = req.body
        await this.mainService.updateKeyStore(key, data)
    return res.status(httpStatus.OK).send(SuccessResponse("key store updated successfully!"))
    }

    public deleteValue =  async (req: Request<{}, {}, any>, res: Response) => {
    const {key} = req.params
    await this.mainService.deleteKeyStore(key);
    return res.status(httpStatus.OK).send(SuccessResponse("Key store deleted successfully!"))
}
}
