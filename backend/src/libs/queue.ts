/* eslint-disable prettier/prettier */
import Bee from 'bee-queue';

import redisConfig from '../config/redis';

import cancellationMail from '../app/jobs/cancellationMail.job';
import assignedOrder from '../app/jobs/assignedOrder.job';

const jobs = [cancellationMail, assignedOrder];

class Queue {
  private queues: Object;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    if (process.env.NODE_ENV !== 'test') {
      jobs.forEach(({ key, handle }) => {
        this.queues[key] = {
          bee: new Bee(key, {
            redis: redisConfig,
          }),
          handle,
        };
      });
    }
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
