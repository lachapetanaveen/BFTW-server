import { Response } from 'express';

const server_ok = (res: Response, args: any) => {
  res.status(200).json(args);
};
const no_content = (res: Response) => {
  res.status(204);
};
const bad_request = (res: Response, args: any) => {
  res.status(400).json(args);
};
const forbidden = (res: Response, args: any) => {
  res.status(403).json(args);
};
const not_found = (res: Response, args: any) => {
  res.status(404).json(args);
};
const conflict = (res: Response, args: any) => {
  res.status(409).json(args);
};

const server_error = (res: Response, args: any) => {
  res.status(500).json(args);
};

export { server_ok, bad_request, server_error, forbidden, not_found, conflict, no_content };
