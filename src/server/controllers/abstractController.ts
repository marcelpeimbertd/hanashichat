import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'mongoose';

abstract class Controller {
    public abstract model: Model<any>;

    // Get all
    public getAll(req: Request, res: Response) {
        this.model.find({})
            .then(res.json)
            .catch(console.error);
    }

    // Count all
    public count(req: Request, res: Response) {
        this.model.count({})
            .then(res.json)
            .catch(console.error);
    }

    // Insert
    public insert(req: Request, res: Response) {
        const obj = new this.model(req.body);
        obj.save()
            .then(res.status(200).json)
            .catch(console.error);
    }

    // Get by id
    public get(req: Request, res: Response) {
        this.model.findOne({ _id: req.params.id })
            .then(res.status(200).json)
            .catch(console.error);
    }

    // Update by id
    public update(req: Request, res: Response) {
        this.model.findByIdAndUpdate(req.params, req.body)
            .then(res.status(200).json)
            .catch(console.error);
    }

    // Delete by id
    public delete(req: Request, res: Response) {
        this.model.findOneAndRemove({ _id: req.params.id })
            .then((ok) => res.sendStatus(200))
            .catch(console.error);
    }
}

export default Controller;
